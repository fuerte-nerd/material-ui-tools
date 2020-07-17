import FontFaceObserver from "fontfaceobserver";
import store from "../state/store";
import {
  setFontLoading,
  setFont,
  setFontPicker,
  setHeaderFont,
  setFontToValidate,
} from "../state/actions";
import getRandomFont from "./getRandomFont";

const loadFonts = async (
  targets = ["body", "header"],
  random = true,
  fontToLoad = null
) => {
  const state = store.getState();

  const { fontPicker } = state;

  // prepare fonts for validation

  const fontsArr = targets.map((i) => {
    const font = random ? getRandomFont() : fontToLoad;
    return {
      target: i,
      font,
    };
  });

  await store.dispatch(
    setFontToValidate({
      enabled: true,
      fonts: fontsArr,
    })
  );
  fontsArr.map(async (f, ind) => {
    console.log(f.font.themeName);
    const newFont = new FontFaceObserver(f.font.themeName);
    await newFont.load().then(
      () => {
        console.log(ind);
        if (ind === fontsArr.length - 1) {
          fontsArr.map(async (i) => {
            switch (i.target) {
              case "body":
                await store.dispatch(setFont(i.font));
                break;
              case "header":
                await store.dispatch(setHeaderFont(i.font));
                break;
              default:
                break;
            }
          });
        }
      },
      () => {
        if (random) {
          switch (f.target) {
            case "body":
              loadFonts(["body"]);
              break;
            case "header":
              loadFonts(["header"]);
              break;
            default:
              break;
          }
        } else {
          store.dispatch(setFontPicker({ ...fontPicker, notFound: true }));
        }
      }
    );
  });
};
export default loadFonts;