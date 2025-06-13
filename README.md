# Pfxr

**pfxr** is a monorepo containing:

* a **JavaScript library** for generating retro-style sound effects on the fly
* a **web interface** to design, test, and export sounds

Inspired by [sfxr](https://www.drpetter.se/project_sfxr.html) and [bfxr](https://www.bfxr.net/).

A C port of the library is available at [konsumer/pfxr-c](https://github.com/konsumer/pfxr-c).

---

## Project structure

```
/packages
  /synth      → JavaScript sound synthesis library
  /app        → Web interface
```

---

## Usage

* The JS library can be used to generate sound effects dynamically in web apps or games.
* The interface allows you to tweak parameters and export sounds as WAV or JSON.
* Sounds designed in the interface can also be loaded into the JS or C library via the URL (query string parameters).
