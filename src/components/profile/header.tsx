import { Navbar, NavbarBrand, Button, NavbarContent } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Kanit } from 'next/font/google'

interface HeaderProps {
  buttonLabel: string;
  buttonLink: string;
}

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const Header: React.FC<HeaderProps> = ({ buttonLabel, buttonLink }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(buttonLink);
  };

  return (
    <Navbar 
      className ="bg-white shadow-sm"
      maxWidth="xl"
      position="static"
    >
      <NavbarBrand className="gap-20">
        <Button 
          radius="full" 
          color="success" 
          variant="solid"
          className={`${kanit.className} text-lg text-white font-bold flex items-center space-x-4 justify-between gap-x-2`}
          onClick={handleButtonClick}
        >
          {buttonLabel}
        </Button>
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-4">
        <Button
          radius="full"
          color="success"
          variant="solid"
          className={`${kanit.className} text-lg text-white font-bold flex items-center space-x-4 justify-between gap-x-2`}
        >
          Delete Profile
        </Button>
        <Button
          radius="full"
          color="success"
          variant="solid"
          className={`${kanit.className} text-lg text-white font-bold flex items-center space-x-4 justify-between gap-x-2`}
          onClick={() => { router.push('./') }}
        >
          Save Changes
        </Button>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;