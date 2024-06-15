import { List, len, nil, equal ,cons, rev } from './list';
import { Color } from './color';


/**
 * Returns the list of colors shown in the each of the odd rows (first, third,
 * fifth, etc.) by a weave with the given warp and weft colors.
 * @param list of all the (warp) colors in the weave
 * @param c (weft) color to replace odd indices of the colors with
 * @return leave(colors, c) by the mathematical definition of leave
 */
export const leave =
    (colors: List<Color>, c: Color): List<Color> => {
  // TODO(5c): detect and handle odd length lists here
  if(colors.kind != "nil" && len(colors) % 2n === 1n){
    return cons(colors.hd, replace(colors.tl, c));
  }


  let R: List<Color> = rev(colors);
  let S: List<Color> = nil;
  let T: List<Color> = nil;

  // Inv: colors = concat(rev(R), S) and T = leave(S, c)
  while (R.kind !== "nil" && R.tl.kind !== "nil") {
    T = cons(R.tl.hd, cons(c, T));
    S = cons(R.tl.hd, cons(R.hd, S));
    R= R.tl.tl;
  }

  if (!equal(S, colors)) {  // defensive programming
    throw new Error("uh oh! S != colors... we made a mistake somewhere!");
  }

  if (R.kind === "nil") {
    return T;  // We have S = colors, so T = leave(S, c) = leave(colors, c).
  } else {
    throw new Error("uh oh! the list length wasn't even");
  }
};

/**
 * Returns the list of colors shown in the each of the even rows (second,
 * fourth, etc.) by a weave with the given warp and weft colors.
 * @param list of all the (warp) colors in the weave
 * @param c (weft) color to replace even indices of the colors with
 * @return replace(colors, c) by the mathematical definition of replace
 */
export const replace =
    (colors: List<Color>, c: Color): List<Color> => {
  // TODO(5c): detect and handle odd length lists here
  if(colors.kind != "nil" && len(colors) % 2n === 1n){
    return cons(c, leave(colors.tl, c));
  }

  let R: List<Color> = rev(colors);
  let S: List<Color> = nil;
  let T: List<Color> = nil;

  // Inv: colors = concat(rev(R), S) and T = replace(S, c)
  while (R.kind !== "nil" && R.tl.kind !== "nil") {
    T = cons(c, cons(R.hd, T));
    S = cons(R.tl.hd, cons(R.hd, S));
    R= R.tl.tl;
  }

  if (!equal(S, colors)) {  // defensive programming
    throw new Error("uh oh! S != colors... we made a mistake somewhere!");
  }

  if (R.kind === "nil") {
    return T;  // We have S = colors, so T = replace(S, c) = replace(colors, c)
  } else {
    throw new Error("uh oh! the list length wasn't even");
  }
};

/**
 * Returns the given number of rows of a weave with the given colors
 * @param rows the (natural) number of rows in the weave
 * @param colors the warp colors in each row
 * @param c the weft color
 * @returns weave(rows, colors, c) by the mathematical definition of weave
 */
export const weave =
    (rows: bigint, colors: List<Color>, c: Color): List<List<Color>> => {
  // TODO(6): implement this with a while loop
  //    Be sure to document your loop invariant with an Inv comment above the loop

  if(rows === 0n){
    return nil
  }
  else if(rows === 1n){
    return cons(replace(colors, c), nil);
  }

  let i: bigint = rows % 2n === 1n ? 1n : 0n;
  let s: List<List<Color>> = i === 1n ? cons(replace(colors, c), nil) : nil;

  // Inv: weave(i, colors, c) = s
  while (i != rows) {
    s = cons(replace(colors, c), cons(leave(colors, c), s));
    i += 2n;
  }

  if(i != rows) {  // defensive programming
    throw new Error("uh oh! i != rows... we made a mistake somewhere!");
  }

  return s;
};
