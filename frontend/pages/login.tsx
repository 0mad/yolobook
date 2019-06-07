import { LoginTemplate } from '../components/Login';
import LoginContainer from '../containers/LoginContainer';

interface IProps {}

const Login = (props: IProps) => (
  <LoginTemplate>
    <LoginContainer />
  </LoginTemplate>
);

export default Login;
