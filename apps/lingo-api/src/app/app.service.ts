import { SupabaseService } from '@hbo-ict/supabase-auth';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly supabseSerive: SupabaseService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async signUp(email: string, password: string) {
    const client = await this.supabseSerive.getClient();
    const { error, data } = await client.auth.signUp({ email, password });
    if (error) {
      throw error;
    }
    return data.session;
  }
}
