// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /*api: 'http://localhost/',
  customerKey: 'ck_4bde27fb428105aa10cf9d312076164edd22f52b',
  customerSecret: 'cs_8b5d934881fa32d3a1c4fc4b2cd8c862cfc173d2',
  conektaKey: 'key_GBPUq2gFH53sFRcRqfv8qyw',
  conektaLocale: 'es',*/
  url: 'https://centraldepisos.com.mx/',
  api: 'https://api.centraldepisos.com.mx/',
  customerKey: 'ck_736b866c68ae5097f9049de39a2f34e78af09f0c',
  customerSecret: 'cs_f08924e0db3a0b19fdf62e1db580f1611170cb8f',
  conektaKey: 'key_ytX37tCzuqiGoMWyqxN7FA',
  conektaLocale: 'es',
  apiGoogle: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBxyqx1ovc98MV7imdwemTz421H_VsCBrM'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
