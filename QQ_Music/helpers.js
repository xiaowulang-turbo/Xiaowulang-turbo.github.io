import { API_URL } from "./config.js";
import { TIMEOUT_SEC } from "./config.js";

/**
 *
 * @param { number} s  Timeout in seconds.
 * @returns Promise that rejects after the timeout.
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second.`));
    }, s * 1000);
  });
};

/**
 * AJAX request to the REST Countries API.
 * @param {*} url API endpoint URL.
 * @returns data | error message
 */
export const AJAX = async function (url) {
  try {
    const fetchPro = fetch(url); // fetch the url
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // return data for the next .then() step
  } catch (err) {
    console.error(err);
    throw err; // in case of error, throw it
  }
};

export const $ = (selector) => document.querySelector(selector);
