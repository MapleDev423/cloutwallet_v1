import { Style } from "./creatorCard.styles";

import gsap from "gsap";
import { Transition, SwitchTransition } from "react-transition-group";

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

function CreatorCard({ card, mode }) {
  const { name, img, price, value } = card;
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
          {mode === "price" ? <span>{price}</span> : <span>{value}</span>}
        </Transition>
      </SwitchTransition>
    </Style.Container>
  );
}

export default CreatorCard;
