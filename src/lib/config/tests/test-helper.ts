import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export class TestHelper {
  private tempDir: string;

  constructor() {
    this.tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'config-test-'));
    // Create the config directory immediately
    fs.mkdirSync(path.join(this.tempDir, 'config'), { recursive: true });
  }

  createConfigFile(filename: string, content: string): void {
    const configDir = path.join(this.tempDir, 'config');
    fs.writeFileSync(path.join(configDir, filename), content);
  }

  getTempDir(): string {
    return this.tempDir;
  }

  cleanup(): void {
    fs.rmSync(this.tempDir, { recursive: true, force: true });
  }
}
