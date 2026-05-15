// Arcjet configuration

import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.JS";

const aj = arcjet({

    key: ARCJET_KEY,

    characteristics: ["ip.src"],

    rules: [

        shield ({ mode: "live" }),

        detectBot({ 

            mode: "LIVE",

            allow: ["CATEGORY:SEARCH_ENGINE"],

         }),

         tokenBucket({
            mode: "LIVE",
            refillRate: 5, // number of tokens added to the bucket per interval
            interval: 10, // interval in seconds for refilling the bucket
            capacity: 10, // maximum number of tokens the bucket can hold
         })

    ]
})

export default aj;