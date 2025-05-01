type BemInput =
  | string
  | {
    block: string;
    element?: string;
    modifiers?: string[];
    extra?: string;
  };

interface BemOptions {
  blockname?: string;
  modifiers?: string[];
  extra?: string;
}

export function bem(
  base: BemInput,
  options: BemOptions = {}
): string {
  let block = '';
  let element = '';
  let modifiers: string[] = [];
  let extra = '';
  let baseClass = '';

  if (typeof base === 'string') {
    block = options.blockname || base;
    element = options.blockname ? base : '';
    modifiers = options.modifiers ?? [];
    extra = options.extra ?? '';
  } else {
    block = base.block;
    element = base.element ?? '';
    modifiers = base.modifiers ?? [];
    extra = base.extra ?? '';
  }

  baseClass = element ? `${block}__${element}` : block;

  const filteredModifiers = modifiers.filter(Boolean);

  const classes = [baseClass];

  for (const mod of filteredModifiers) {
    classes.push(`${baseClass}--${mod}`);
  }

  if (extra) {
    classes.push(extra);
  }

  return classes.join(' ');
}

