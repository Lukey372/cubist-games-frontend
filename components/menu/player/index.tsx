import { scrollToElement } from "../../utils/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { HomeMenuType } from "./types";
import Link from "next/link";
import SiteLinks from "../menu_item/site_links";

const SocialLinks = dynamic(() => import("../menu_item/site_links"));
const Button = dynamic(() => import("../../button"));
const MenuItem = dynamic(() => import("../menu_item"));
const Icon = dynamic(() => import("../../icon"));

export default function PlayerMenu({ toggle }: HomeMenuType) {
  const ScrollSection = (section: string) => {
    if (toggle) {
      toggle();
    }
    scrollToElement(section);
  };

  return (
    <motion.ul
      variants={{
        open: {
          transition: { staggerChildren: 0.07, delayChildren: 0.2 },
        },
        closed: {
          transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
      }}
    >
      <MenuItem className="social" whileHover={{}}>
        <SiteLinks toggle={toggle} />
      </MenuItem>
      <MenuItem>
        <Link href="/admin">
          <a title="Settings" onClick={toggle}>
            Admin
          </a>
        </Link>
      </MenuItem>
      <MenuItem whileTap={{}} whileHover={{}}>
        <Button cType="wallet" />
      </MenuItem>
    </motion.ul>
  );
}
