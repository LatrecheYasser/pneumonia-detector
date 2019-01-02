#! /usr/bin/python3

import requests as req
from sys import argv, exit

API_URL = "http://130.211.108.207:3000/pred"
# API_URL = "http://localhost/pred"

def fatal(msg):
    print(msg)
    exit()

if __name__ == "__main__":
    if len(argv) != 2:
        fatal("[*] Usage: %s <chest_xray_image>" % argv[0])

    try:
        chest_xray = open(argv[1], "rb")
    except:
        fatal("[-] Can't open file '%s'" % argv[1])

    try:
        resp = req.post(API_URL, files={'chest_xray': chest_xray})
    except:
        fatal("[-] Can't connect to the API")

    probs = resp.json()
    if type(probs) != type(dict()):
        fatal("[-] Bad response from the server")

    list_probs = [(k, v) for k,v in zip(probs.keys(), probs.values())]
    sorted_probs = sorted(list_probs, key=lambda x:x[1], reverse=True)
    for cat_prob in sorted_probs:
        print("[+] It's %s with a %f probability"  % cat_prob)
