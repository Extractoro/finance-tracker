import googleOauthConfig from './google-oauth.config';

const configModuleConfig = { isGlobal: true, load: [googleOauthConfig] };

export default configModuleConfig;
