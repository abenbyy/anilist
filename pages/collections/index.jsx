import { NavBar, NavItem, Container } from "components";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Collections() {
  return (
    <>
      <NavBar>
        <Container>
          <NavItem>
            <Link href="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link href="/collections">Collections</Link>
          </NavItem>
        </Container>
      </NavBar>
      <div>Collections</div>
    </>
  );
}
