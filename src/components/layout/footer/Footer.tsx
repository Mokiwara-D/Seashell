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

function Footer() {
  return (
    <Container
      wrapperElement="footer"
      wrapperClassName="bg-secondary py-12 md:py-16"
      contentClassName="flex flex-col gap-8 text-sm"
    >
      {/* Main Footer Content */}
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-10">
        {/* Contact Section */}
        <div className="flex flex-1 flex-wrap justify-center gap-4 sm:flex-nowrap md:justify-start lg:flex-col">
          <div className="flex flex-col gap-4">
            <h3 className="flex-1 text-center text-lg font-bold sm:text-left lg:flex-0">
              Speak to a holiday expert
            </h3>
            <p className="text-muted-foreground text-center sm:text-left">
              Whether you're looking for a short UK break, a sunny Package
              Holiday, All Inclusive Getaway or something else entirely, our
              team will help you book the holiday of your dreams.
            </p>
          </div>
          <div className="bg-primary flex w-fit min-w-1/2 flex-col gap-2 self-center rounded-lg p-4 lg:w-full">
            <Button
              variant="ghost"
              className="hover:bg-accent/80 w-fit gap-2 rounded-full"
            >
              <FaPhone className="h-4 w-4" />
              0800 265 5488
            </Button>

            <Button
              variant="ghost"
              className="hover:bg-accent/80 w-fit gap-2 rounded-full"
            >
              <PiUmbrellaBold className="h-4 w-4 -rotate-45" />
              My Booking
            </Button>
          </div>
        </div>

        {/* Navigation Links - Side by side on mobile, stacked on tablet+ */}
        <div className="flex flex-1 flex-row flex-wrap gap-8 sm:gap-12 md:flex-row md:gap-8 lg:flex-nowrap lg:gap-12">
          {/* Seashell Links */}
          <div className="flex flex-1 flex-col gap-4 text-center text-nowrap sm:text-left">
            <h3 className="text-foreground text-lg font-bold">Seashell</h3>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Financial Protection
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Careers
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customer Reviews
              </a>
            </div>
          </div>

          {/* Policies Links */}
          <div className="flex flex-1 flex-col gap-4 text-center text-nowrap sm:text-right lg:text-left">
            <h3 className="text-foreground text-lg font-bold">Policies</h3>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Package Rights
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Booking Conditions
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Cookies Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Modern Slavery Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Safeguarding Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Foreign Travel Advice
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Advice for Travelling Abroad
              </a>
            </div>
          </div>
        </div>

        {/* Peace of Mind Section */}
        <div className="flex flex-1 flex-col items-center gap-4 text-center sm:items-start sm:text-left">
          <h3 className="text-lg font-bold">Total peace of mind</h3>

          {/* ABTA and ATOL Badges */}
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

          <p className="text-muted-foreground">
            Packages that include a flight element are financially protected by
            the ATOL scheme. The ATOL protection does not apply to all holiday
            and travel services, please ask us to confirm what protection may
            apply to your booking. If you do not receive an ATOL Certificate,
            then the booking will not be ATOL protected. If you do receive an
            ATOL Certificate but all the parts of your trip are not listed on
            it, those parts will not be ATOL protected.
          </p>

          <p className="text-muted-foreground">
            For more information about financial protection and the ATOL
            Certificate visit:
            <a href="https://www.atol.org.uk" className="ml-1 hover:underline">
              https://www.atol.org.uk
            </a>
          </p>
        </div>
      </div>

      {/* Social Media and Copyright */}
      <div className="border-foreground flex w-full flex-col flex-nowrap justify-between gap-8 border-t pt-8 md:flex-row">
        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 text-white lg:justify-start">
          <a
            href="#"
            className="bg-foreground hover:bg-foreground/90 flex h-10 w-10 items-center justify-center rounded-full"
          >
            <FaFacebookF className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="bg-foreground hover:bg-foreground/90 flex h-10 w-10 items-center justify-center rounded-full"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="bg-foreground hover:bg-foreground/90 flex h-10 w-10 items-center justify-center rounded-full"
          >
            <FaXTwitter className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="bg-foreground hover:bg-foreground/90 flex h-10 w-10 items-center justify-center rounded-full"
          >
            <FaTiktok className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="bg-foreground hover:bg-foreground/90 flex h-10 w-10 items-center justify-center rounded-full"
          >
            <FaYoutube className="h-6 w-6" />
          </a>
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
