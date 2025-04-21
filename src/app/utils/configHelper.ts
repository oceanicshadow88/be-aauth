import path from 'path';
import fs from 'fs';

function loadAppConfig() {
  const configPath = path.join(process.cwd(), 'config', 'aauth.ts');
  if (fs.existsSync(configPath)) {
    return require(configPath);
  }
  return {};
}

const getConfig = () => {
  const defaultConfig = {
    verifyUrl: 'api/v1/verify',
    redirectHost: 'http://localhost:8000',
    appName: 'app',
  };

  return {
    ...defaultConfig,
    ...loadAppConfig(),
  };
};

export default getConfig();