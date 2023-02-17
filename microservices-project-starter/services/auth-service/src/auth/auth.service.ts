import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CollectionReference } from '@google-cloud/firestore';

import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { Tokens } from './auth.controller';

import { AuthDocument } from './auth.document';

import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(AuthDocument.collectionName)
    private authCollection: CollectionReference<AuthDocument>,
  ) {}

  async register(dto): Promise<string> {
    const { email, password } = dto;

    const docRef = this.authCollection.doc(email);

    // Use .add() instead if we want auto-generated ID from Firestore
    await docRef.set({
      id: uuid(),
      email,
      password: bcrypt.hash(password, bcrypt.genSalt()),
    });

    return 'User created';

    // In case we want to return the user
    // const authDoc = await docRef.get();
    // const user = authDoc.data();
    // return user;
  }

  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.findUser('email', dto.email);

    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.signTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string): Promise<void> {
    await this.authCollection.doc(userId).update({
      hashedRefreshToken: null,
    });
  }

  async refresh(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.findUser('id', userId);

    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const tokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    // The token is invalid and we can't issue a pair of new tokens
    if (!tokenMatches) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.signTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async signTokens(userId: string, email: string): Promise<Tokens> {
    const refreshToken = await this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: this.configService.get('REFRESH_LIFESPAN') },
    );
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: this.configService.get('ACCESS_LIFESPAN') },
    );

    return {
      refreshToken,
      accessToken,
    };
  }

  private async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken);

    await this.authCollection.doc(userId).update({
      hashedRefreshToken,
    });
  }

  private async findUser(prop: 'email' | 'id', value: string) {
    const usersSnapshot = await this.authCollection.get();

    let user: Partial<AuthDocument> = {};

    usersSnapshot.forEach((doc) => {
      const docData = doc.data();

      if (docData[prop] === value) {
        user = docData;

        return;
      }
    });

    return user;
  }
}
