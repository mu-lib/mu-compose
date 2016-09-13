# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
