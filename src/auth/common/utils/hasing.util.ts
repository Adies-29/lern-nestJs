import * as bcrypt from 'bcrypt';

export class HashingUtil {
  private static readonly SALT_ROUNDS = 12;

  //acak
  static async hash(plaintext: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    return bcrypt.hash(plaintext, salt);
  }

  //perbandingan password
  static async compare(plaintext: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hash);
  }
}