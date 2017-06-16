# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="6.0.4"></a>
## [6.0.4](https://github.com/mu-lib/mu-create/compare/v6.0.3...v6.0.4) (2017-06-16)


### Bug Fixes

* no need to .call factory ([1eca361](https://github.com/mu-lib/mu-create/commit/1eca361))



<a name="6.0.3"></a>
## [6.0.3](https://github.com/mu-lib/mu-create/compare/v6.0.2...v6.0.3) (2017-06-15)


### Bug Fixes

* UMD fixes ([9e2c054](https://github.com/mu-lib/mu-create/commit/9e2c054))



<a name="6.0.2"></a>
## [6.0.2](https://github.com/mu-lib/mu-create/compare/v6.0.1...v6.0.2) (2017-04-06)


### Bug Fixes

* bumped deps ([db1cb5d](https://github.com/mu-lib/mu-create/commit/db1cb5d))
* use Array.prototype over [] ([092400c](https://github.com/mu-lib/mu-create/commit/092400c))



<a name="6.0.1"></a>
## [6.0.1](https://github.com/mu-lib/mu-create/compare/v6.0.0...v6.0.1) (2017-03-19)


### Bug Fixes

* clean output from concat ([c06ff7a](https://github.com/mu-lib/mu-create/commit/c06ff7a))



<a name="6.0.0"></a>
# [6.0.0](https://github.com/mu-lib/mu-create/compare/v5.0.1...v6.0.0) (2017-03-18)


### Features

* filter duplicates ([a46a818](https://github.com/mu-lib/mu-create/commit/a46a818))


### BREAKING CHANGES

* It was never specified how duplicate specs were supposed to be applied but from now overlaps are disallowed.



<a name="5.0.1"></a>
## [5.0.1](https://github.com/mu-lib/mu-create/compare/v5.0.0...v5.0.1) (2016-10-19)


### Bug Fixes

* **create:** don't name Composition ([a29964b](https://github.com/mu-lib/mu-create/commit/a29964b))



<a name="5.0.0"></a>
# [5.0.0](https://github.com/mu-lib/mu-create/compare/v4.2.1...v5.0.0) (2016-10-16)


### Features

* **prototype:** allow prototype value to be a function ([1f99354](https://github.com/mu-lib/mu-create/commit/1f99354))


### BREAKING CHANGES

* prototype: We've retired `proto` as it can be better implemented
with a callback.



<a name="4.2.1"></a>
## [4.2.1](https://github.com/mu-lib/mu-create/compare/v4.2.0...v4.2.1) (2016-10-16)


### Bug Fixes

* **prototype:** smaller proto ([d8b5262](https://github.com/mu-lib/mu-create/commit/d8b5262))



<a name="4.2.0"></a>
# [4.2.0](https://github.com/mu-lib/mu-create/compare/v4.1.1...v4.2.0) (2016-10-16)


### Bug Fixes

* **tests:** cleanup ([c5e320b](https://github.com/mu-lib/mu-create/commit/c5e320b))


### Features

* **prototype:** added support for proto ([186b686](https://github.com/mu-lib/mu-create/commit/186b686))



<a name="4.1.1"></a>
## [4.1.1](https://github.com/mu-lib/mu-create/compare/v4.1.0...v4.1.1) (2016-10-12)


### Bug Fixes

* **packaging:** Updated package.json ([233d02e](https://github.com/mu-lib/mu-create/commit/233d02e))
* **tests:** Clean UMD ([b8c5a57](https://github.com/mu-lib/mu-create/commit/b8c5a57))



<a name="4.1.0"></a>
# [4.1.0](https://github.com/mu-lib/mu-create/compare/v4.0.0...v4.1.0) (2016-09-22)


### Features

* **prototype:** added support for setting protype ([#3](https://github.com/mu-lib/mu-create/issues/3)) ([8856c6f](https://github.com/mu-lib/mu-create/commit/8856c6f))



<a name="4.0.0"></a>
# [4.0.0](https://github.com/mu-lib/mu-create/compare/v3.1.0...v4.0.0) (2016-09-13)


### Features

* package rename ([baba360](https://github.com/mu-lib/mu-create/commit/baba360))


### BREAKING CHANGES

* The package name was changed from mu-compose to mu-create
to not clash with existing npm package.



<a name="3.1.0"></a>
# [3.1.0](https://github.com/mu-lib/mu-compose/compare/v3.0.0...v3.1.0) (2016-09-13)


### Features

* added basic extend based on concat ([ae23799](https://github.com/mu-lib/mu-compose/commit/ae23799))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/mu-lib/mu-compose/compare/v2.2.0...v3.0.0) (2016-09-12)


### Features

* allow safe extension of rules and blueprints ([800cf39](https://github.com/mu-lib/mu-compose/commit/800cf39))


### BREAKING CHANGES

* this commit allows for a safer extension point and thus
the old .rules and .blueprints properties are now removed.



<a name="2.2.0"></a>
# [2.2.0](https://github.com/mu-lib/mu-compose/compare/v2.1.1...v2.2.0) (2016-09-12)


### Features

* expose rules and blueprints ([a2c7ace](https://github.com/mu-lib/mu-compose/commit/a2c7ace))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/mu-lib/mu-compose/compare/v2.1.0...v2.1.1) (2016-09-09)



<a name="2.1.0"></a>
# [2.1.0](https://github.com/mu-lib/mu-compose/compare/v2.0.0...v2.1.0) (2016-09-08)


### Features

* make it all testable with tap ([#1](https://github.com/mu-lib/mu-compose/issues/1)) ([bdc891d](https://github.com/mu-lib/mu-compose/commit/bdc891d))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/mu-lib/mu-compose/compare/v1.0.1...v2.0.0) (2016-09-03)


### Bug Fixes

* update package name in package.json ([ab05161](https://github.com/mu-lib/mu-compose/commit/ab05161))


### Features

* constructors can change arguments for next invocation ([ebe172e](https://github.com/mu-lib/mu-compose/commit/ebe172e))


### BREAKING CHANGES

* Previously constructors could return a new value that
would change the return type of the object. The new usage is to return a
value to be passed to the next constructor - if the value is an array ||
arguments it will be spread over the next constructor, if it's a native
type it will be wrapped in an array and spread over the next constructor,
otherwise the previous args will be used for the next
invocation.



<a name="1.0.1"></a>
## [1.0.1](https://github.com/mu-lib/mu-compose/compare/v1.0.0...v1.0.1) (2016-09-03)


### Bug Fixes

* UMD fixes ([11515fd](https://github.com/mu-lib/mu-compose/commit/11515fd))



<a name="1.0.0"></a>
# 1.0.0 (2016-09-02)


### Features

* more generic composition key ([ea5b661](https://github.com/mu-lib/mu-compose/commit/ea5b661))
* regexp now takes callback as argument ([3bb3bfa](https://github.com/mu-lib/mu-compose/commit/3bb3bfa))
* retired dom for more generic regexp ([af48bf1](https://github.com/mu-lib/mu-compose/commit/af48bf1))



<a name="1.0.0"></a>
# 1.0.0 (2016-09-02)


### Features

* more generic composition key ([ea5b661](https://github.com/mu-lib/mu-compose/commit/ea5b661))
* regexp now takes callback as argument ([3bb3bfa](https://github.com/mu-lib/mu-compose/commit/3bb3bfa))
* retired dom for more generic regexp ([af48bf1](https://github.com/mu-lib/mu-compose/commit/af48bf1))
