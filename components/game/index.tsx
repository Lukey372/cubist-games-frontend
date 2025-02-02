import { AnimatePresence, motion } from "framer-motion";
import styles from "./DefaultGame.module.scss";
import dynamic from "next/dynamic";
import { GamePropsType, DefaultGamePropsType } from "./types";
import { format_time } from "../utils/date";
import { game_state } from "../utils/game";

const Templates: any = {};

const Definition = dynamic(() => import("./definition"));
const StakeButtons = dynamic(() => import("./stake-buttons"));
const Stats = dynamic(() => import("./stats"));
const Results = dynamic(() => import("./results"));
const CTA = dynamic(() => import("./cta"));

function DefaultGame({ template, ...props }: DefaultGamePropsType) {
  const gameState = game_state(props.game.data);
  return (
    <>
      <motion.ul className={styles.states}>
        <li className={gameState === "Open" ? "active" : ""}>
          Open<time>{format_time(props.game.data.openTime)}</time>
        </li>
        <li className={gameState === "Closed" ? "active" : ""}>
          Closed<time>{format_time(props.game.data.closeTime)}</time>
        </li>
        <li className={gameState === "Settled" ? "active" : ""}>
          Settled<time>{format_time(props.game.data.settleTime)}</time>
        </li>
      </motion.ul>
      <Definition
        template={template}
        game={props.game}
        terms={props.terms}
        setTerms={props.setTerms}
        setMainModal={props.setMainModal}
      />
      <Stats
        template={template}
        game={props.game}
        prevGame={props.prevGame}
        setMainModal={props.setMainModal}
      />
      {gameState === "Open" && (
        <StakeButtons
          template={template}
          solanaProgram={props.solanaProgram}
          connection={props.connection}
          systemConfig={props.systemConfig}
          game={props.game}
          pdas={props.pdas}
          modals={props.modals}
          setModals={props.setModals}
          customStake={props.customStake}
          setCustomStake={props.setCustomStake}
          setWalletVisible={props.setWalletVisible}
          sendTransaction={props.sendTransaction}
          termsAgreed={props.terms.agreed}
          publickey={props.publickey}
          playerBets={props.playerBets}
        />
      )}
      <AnimatePresence>
        {!!props.game.data.settledAt && !!props.myBets.length && (
          <Results
            template={template}
            game={props.game}
            myBets={props.myBets}
          />
        )}
      </AnimatePresence>
      <CTA
        publickey={props.publickey}
        template={template}
        game={props.game}
        prevGame={props.prevGame}
        myBets={props.myBets}
        playerBets={props.playerBets}
        handleClaim={props.handleClaim}
        solFiatPrice={props.solFiatPrice}
        modals={props.modals}
        setModals={props.setModals}
      />
    </>
  );
}

export default function Game({ template, ...props }: GamePropsType) {
  const Game =
    template && Templates.hasOwnProperty(template)
      ? Templates[template]
      : DefaultGame;

  return <Game template={template} {...props} />;
}
