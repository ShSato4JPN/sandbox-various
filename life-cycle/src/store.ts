import { atom } from "jotai";

export const fooAtom = atom<string>("");
export const barAtom = atom<string>("");

export const allAtom = atom<{ foo: string; bar: string }>((get) => ({
  foo: get(fooAtom),
  bar: get(barAtom),
}));

export const updateFooAtom = atom(null, (_, set, newValue: string) => {
  set(fooAtom, newValue);
});

export const updateBarAtom = atom(null, (get, set) => {
  const value = get(fooAtom);
  console.log(`${value} from updateBarAtom`);
  set(barAtom, value);
});

export const allUpdateAtom = atom(null, (_, set, newValue: string) => {
  // 1. allUpdate から渡された値を fooAtom に追加
  set(updateFooAtom, newValue);
  // 2. 同じライフルサイクル内で 1. で追加した値を参照
  set(updateBarAtom);
});
