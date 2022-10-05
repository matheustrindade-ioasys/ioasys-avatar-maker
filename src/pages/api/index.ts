import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import sharp from "sharp";
import axios from "axios";

import templateUrl from "../../constants/template-url";

const upload = multer();

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("avatar"));

apiRoute.post(async (req, res) => {
  // @ts-ignore
  const buffer: Buffer = req.file?.buffer;
  const avatar = sharp(buffer);

  const overlay = (
    await axios({
      url: templateUrl,
      responseType: "arraybuffer",
    })
  ).data as Buffer;

  avatar.resize(1000, 1000);
  avatar
    .composite([{ input: overlay, top: 0, left: 0 }])
    .toBuffer((_, buff) => {
      return res.end(buff);
    });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
