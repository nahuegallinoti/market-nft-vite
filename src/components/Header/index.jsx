import { MainTitle } from '../Navbar/NavbarElements';
import { DivCenter } from '../_Shared/styles/GlobalElements';

export default function Header(props) {
  return (
    <DivCenter>
      <MainTitle colorTitle={props.colorTitle}>{props.name}</MainTitle>
    </DivCenter>
  );
}
