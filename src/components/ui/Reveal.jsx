import { motion, useReducedMotion } from "framer-motion";

/**
 * Fait apparaître son contenu lorsqu'il entre dans la fenêtre, une seule fois.
 *
 * Si le visiteur a activé « réduire les animations » dans son système, le
 * contenu est rendu immédiatement, sans transformation ni délai.
 */
const Reveal = ({
  children,
  delay = 0,
  y = 24,
  as = "div",
  className,
  ...rest
}) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  // styled-components laisse passer les props transitoires ($span…) vers les
  // composants React : on les retire pour ne pas les poser sur le DOM.
  const domProps = Object.fromEntries(
    Object.entries(rest).filter(([key]) => !key.startsWith("$"))
  );

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...domProps}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
      {...domProps}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
