import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaYoutube,
  FaPhone,
} from 'react-icons/fa6'
import { PiUmbrellaBold } from 'react-icons/pi'
import ABTALogo from '@/assets/ABTA.svg'
import ATOLLogo from '@/assets/TOL.svg'

// Types
interface NavigationLink {
  href: string
  label: string
}

interface NavigationSection {
  title: string
  links: NavigationLink[]
}

interface SocialLink {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}

interface ContactAction {
  href?: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick?: () => void
}

// Data
const navigationSections: NavigationSection[] = [
  {
    title: 'Seashell',
    links: [
      { href: '#', label: 'About Us' },
      { href: '#', label: 'Contact Us' },
      { href: '#', label: 'Financial Protection' },
      { href: '#', label: 'Careers' },
      { href: '#', label: 'Customer Reviews' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { href: '#', label: 'Package Rights' },
      { href: '#', label: 'Booking Conditions' },
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Cookies Policy' },
      { href: '#', label: 'Modern Slavery Policy' },
      { href: '#', label: 'Safeguarding Policy' },
      { href: '#', label: 'Foreign Travel Advice' },
      { href: '#', label: 'Advice for Travelling Abroad' },
    ],
  },
]

const socialLinks: SocialLink[] = [
  { href: '#', icon: FaFacebookF, label: 'Facebook' },
  { href: '#', icon: FaInstagram, label: 'Instagram' },
  { href: '#', icon: FaXTwitter, label: 'Twitter' },
  { href: '#', icon: FaTiktok, label: 'TikTok' },
  { href: '#', icon: FaYoutube, label: 'YouTube' },
]

const contactActions: ContactAction[] = [
  { href: 'tel:08002655488', icon: FaPhone, label: '0800 265 5488' },
  { href: '#', icon: PiUmbrellaBold, label: 'My Booking' },
]

// Components
function NavigationSection({ title, links }: NavigationSection) {
  return (
    <div className="flex flex-1 flex-col gap-4 text-center text-nowrap sm:text-left lg:text-left">
      <h3 className="text-foreground text-lg font-bold">{title}</h3>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-muted-foreground hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

function SocialMediaButton({ href, icon: Icon, label }: SocialLink) {
  return (
    <Button
      asChild
      className="bg-foreground hover:bg-foreground/90 flex h-10 w-10 items-center justify-center rounded-full"
    >
      <a href={href} aria-label={label}>
        <Icon className="text-background size-6" />
      </a>
    </Button>
  )
}

function ContactButton({ href, icon: Icon, label, onClick }: ContactAction) {
  const className = 'hover:bg-accent/80 w-fit gap-2 rounded-full'
  const iconClassName =
    Icon === PiUmbrellaBold ? 'h-4 w-4 -rotate-45' : 'h-4 w-4'

  if (href) {
    return (
      <Button asChild variant="ghost" className={className}>
        <a href={href}>
          <Icon className={iconClassName} />
          {label}
        </a>
      </Button>
    )
  }

  return (
    <Button variant="ghost" className={className} onClick={onClick}>
      <Icon className={iconClassName} />
      {label}
    </Button>
  )
}

function ProtectionBadges() {
  return (
    <div className="flex items-center gap-8">
      <img
        src={ABTALogo}
        alt="ABTA Travel with confidence"
        className="h-12 w-auto object-contain"
      />
      <img
        src={ATOLLogo}
        alt="ATOL Protected"
        className="h-12 w-auto object-contain"
      />
    </div>
  )
}

function ContactSection() {
  return (
    <div className="flex flex-1 flex-wrap justify-center gap-4 sm:flex-nowrap md:justify-start lg:flex-col">
      <div className="flex flex-col gap-4">
        <h3 className="flex-1 text-center text-lg font-bold sm:text-left lg:flex-0">
          Speak to a holiday expert
        </h3>
        <p className="text-muted-foreground text-center sm:text-left">
          Whether you're looking for a short UK break, a sunny Package Holiday,
          All Inclusive Getaway or something else entirely, our team will help
          you book the holiday of your dreams.
        </p>
      </div>
      <div className="bg-primary flex w-fit min-w-1/2 flex-col gap-2 self-center rounded-lg p-4 lg:w-full">
        {contactActions.map((action) => (
          <ContactButton key={action.label} {...action} />
        ))}
      </div>
    </div>
  )
}

function PeaceOfMindSection() {
  return (
    <div className="flex flex-1 flex-col items-center gap-4 text-center sm:items-start sm:text-left">
      <h3 className="text-lg font-bold">Total peace of mind</h3>
      <ProtectionBadges />
      <p className="text-muted-foreground">
        Packages that include a flight element are financially protected by the
        ATOL scheme. The ATOL protection does not apply to all holiday and
        travel services, please ask us to confirm what protection may apply to
        your booking. If you do not receive an ATOL Certificate, then the
        booking will not be ATOL protected. If you do receive an ATOL
        Certificate but all the parts of your trip are not listed on it, those
        parts will not be ATOL protected.
      </p>
      <p className="text-muted-foreground">
        For more information about financial protection and the ATOL Certificate
        visit:
        <a href="https://www.atol.org.uk" className="ml-1 hover:underline">
          https://www.atol.org.uk
        </a>
      </p>
    </div>
  )
}

function Footer() {
  return (
    <Container
      wrapperElement="footer"
      wrapperClassName="bg-secondary py-12 md:py-16"
      contentClassName="flex flex-col gap-8 text-sm"
    >
      {/* Main Footer Content */}
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-10">
        <ContactSection />

        {/* Navigation Links */}
        <div className="flex flex-1 flex-row flex-wrap gap-8 sm:gap-12 md:flex-row md:gap-8 lg:flex-nowrap lg:gap-12">
          {navigationSections.map((section) => (
            <NavigationSection key={section.title} {...section} />
          ))}
        </div>

        <PeaceOfMindSection />
      </div>

      {/* Social Media and Copyright */}
      <div className="border-foreground flex w-full flex-col flex-nowrap justify-between gap-8 border-t pt-8 md:flex-row">
        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 lg:justify-start">
          {socialLinks.map((social) => (
            <SocialMediaButton key={social.label} {...social} />
          ))}
        </div>

        {/* Copyright Text */}
        <p className="text-muted-foreground text-center sm:text-left">
          Seashell Holidays is a trading name of Hays Travel Limited and is
          registered with UK Companies House with registered number 01990682
          Gilbridge House, Keel Square, Sunderland, Tyne and Wear SR1 3HA ©
          2024
        </p>
      </div>
    </Container>
  )
}

export { Footer }
