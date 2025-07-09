import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { PiUmbrellaLight } from 'react-icons/pi'
import { Content, Wrapper } from '@/components/ui/container'
import placeholder from '@/assets/placeholder.jpg'

function NavBar() {
  return (
    <Wrapper className="bg-background">
      <Content className="h-20 gap-4 font-bold text-nowrap">
        <img
          src={placeholder}
          alt="Seashell Holidays logo"
          className="h-full w-auto"
        />
        <NavigationMenu className="grow">
          <NavigationMenuList className="grid grid-cols-3 justify-between gap-x-4 xl:grid-cols-6">
            <NavigationMenuItem>
              <NavigationMenuLink>Holidays</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Destinations</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Cruise</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Travel Money</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Support</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Careers</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button
          size="lg"
          className="hover:bg-accent hover:text-foreground gap-2 rounded-full"
        >
          <PiUmbrellaLight className="size-4 rotate-[-45deg]" />
          <span className="text-sm">My Booking</span>
        </Button>
      </Content>
    </Wrapper>
  )
}

export { NavBar }
