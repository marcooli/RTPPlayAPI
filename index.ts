//credits: https://github.com/guipenedo/rtp-play-api/blob/5611b9ea1e56cd4a62b3b444b3aa4a268a4a70d4/rtpplayapi/api.py#L25

import crypto from "crypto";
import {
  BASE_API_URL,
  RTP_PLAY_AUTH_KEY,
  TOKEN_MANAGER_URL,
} from "./constants";
import {
  GetCategoriesResponse,
  GetCollectionResponse,
  GetEpisodeResponse,
  GetProgramResponse,
  GetSearchResponse,
} from "./model";

class RTPPlayApi {
  private auth_token?: any;

  constructor() {}

  private get_key(currentTime: number) {
    const currentTimeS = `${currentTime}`;
    let key = "";
    let i = 0;

    for (let j = 0; j < RTP_PLAY_AUTH_KEY.length; j++) {
      if (j % 5 === 3) {
        key += currentTimeS[i];
        i += 1;
      }

      key += RTP_PLAY_AUTH_KEY[j];
    }

    return key;
  }

  private rearange = (buf: string) => {
    return buf[1] + buf[0];
  };

  private getSignature = async (key: Buffer, msg: Buffer) => {
    const algorithm = "sha256";
    var hash = crypto.createHmac(algorithm, key);
    hash.update(msg);

    return hash.digest();
  };

  private encode = async (key: string, msg: string) => {
    const asciiKey = Buffer.from(key, "ascii");
    const asciiMsg = Buffer.from(msg, "ascii");
    const signature = await this.getSignature(asciiKey, asciiMsg);
    let encoded = "";
    let digits = "0123456789abcdefghijklmnopqrstuvwxyz";
    let radix = 16;

    for (let x = 0; x < signature.length; x++) {
      let i = (signature[x] & 0xff) + 0x100;
      let buf = "";
      while (i >= radix) {
        buf += digits[i % radix];
        i = Math.floor(i / radix);
      }
      buf += digits[i];
      encoded += this.rearange(buf);
    }
    return encoded;
  };

  getToken = async (currentTime: number) => {
    if (this.auth_token && currentTime < this.auth_token.expire * 1000) {
      return this.auth_token;
    }
    const key = this.get_key(currentTime);
    const msg = currentTime + TOKEN_MANAGER_URL;

    const hash = await this.encode(key, msg);
    const headers = {
      "RTP-Play-Auth": "MOBILE_ANDROID_RTPPLAY_UPDATE",
      "RTP-Play-Auth-Hash": hash,
      "RTP-Play-Auth-Timestamp": `${currentTime}`,
      "User-Agent": "okhttp/3.12.8",
    };
    try {
      const res = await fetch(TOKEN_MANAGER_URL, {
        headers,
      });

      const data = await res.json();
      this.auth_token = data.token;
      return this.auth_token;
    } catch (err) {}
  };

  private async request<T = any>(url: string) {
    const currentTime = Date.now();

    const token = await this.getToken(currentTime);

    const headers = {
      Authorization: "Bearer " + token.token,
      "RTP-Play-Auth-Timestamp": `${currentTime}`,
      "User-Agent": "okhttp/3.12.8",
    };

    try {
      const request = await fetch(`${BASE_API_URL}${url}`, {
        headers,
      });
      const data: T = await request.json();
      return data;
    } catch (err) {
      console.log({ err });
    }
  }

  getCollection = async (id: string | number) => {
    const data = await this.request<GetCollectionResponse>(
      `list-programs/?category_id=${id}`
    );
    return data;
  };

  getCategories = async (id: string | number) => {
    const data = await this.request<GetCategoriesResponse>(`list-categories`);
    return data;
  };

  getEpisode = async (
    programId: string | number,
    episodeId: string | number
  ) => {
    const data = await this.request<GetEpisodeResponse>(
      `get-episode/${programId}/${episodeId}?include_assets=true&include_webparams=true`
    );
    return data;
  };

  getProgram = async (programId: string | number, page = 1, rpp = 10) => {
    const data = await this.request<GetProgramResponse>(
      `list-episodes/${programId}?page${page}&rpp=${rpp}`
    );
    return data;
  };

  // getLiveTvChannels = async () => {
  //   const data = await this.request(
  //     `list-channels?broadcaster=tvlinear&live=true&include_epg=1`
  //   );
  //   return data;
  // };

  search = async (searchTerm: string) => {
    const data = await this.request<GetSearchResponse>(
      `search/?query=${searchTerm}`
    );
    return data;
  };
}

export default RTPPlayApi;
