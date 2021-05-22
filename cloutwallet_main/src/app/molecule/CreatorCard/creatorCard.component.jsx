import { Style } from "./creatorCard.styles";
import gsap from "gsap";
import { Transition, SwitchTransition } from "react-transition-group";
import { nanosToBitClout } from "../../../../helpers/nanosToBitClout";
import { decimalRandom } from "../../../../helpers/decimalRandom";
import USDValueFrom from "../../../../helpers/USDValueCalculation";

function enter(node) {
  gsap.from(node, {
    duration: 0.25,
    autoAlpha: 0,
    ease: "linear.easeIn",
  });
}

function exit(node) {
  gsap.to(node, {
    duration: 0.25,
    autoAlpha: 0,
    ease: "linear.easeOut",
  });
}

function CreatorCard({ card, mode, bitCloutPrice }) {
  const { BalanceNanos, ProfileEntryResponse } = card;
  const value = nanosToBitClout(BalanceNanos);
  const img = ProfileEntryResponse.ProfilePic;
  const name = ProfileEntryResponse.Username;
  const coinsPrice = nanosToBitClout(
    ProfileEntryResponse.CoinPriceBitCloutNanos
  );
  const coinsInCirculation = nanosToBitClout(
    ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos
  );

  const price = USDValueFrom(bitCloutPrice, coinsInCirculation, value);
  return (
    <Style.Container>
      <div className="creator">
        <img src={img} alt={name} />
        <p>{name}</p>
      </div>
      <SwitchTransition>
        <Transition
          key={mode}
          timeout={250}
          in={true}
          onEnter={enter}
          onExit={exit}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          {mode === "price" ? (
            <span>
              $
              {decimalRandom(price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          ) : (
            <span>{decimalRandom(value)}</span>
          )}
        </Transition>
      </SwitchTransition>
    </Style.Container>
  );
}

export default CreatorCard;
