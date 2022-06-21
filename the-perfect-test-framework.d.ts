/**
 * THE PERFECT TEST FRAMEWORK
 * ==========================
 */

/**
 * The `test()` function.
 *
 * ```ts
 * import test from "tester"
 *
 * test("it works", t => {
 *   t.is("hello world".toUpperCase(), "HELLO WORLD")
 * })
 * ```
 */
declare var test: Test
export default test

/**
 * The `test()` function with test modifiers.
 */
export interface Test {
	/**
	 * A test.
	 * @param name - The name of the test, must be unique from all other tests in the same file.
	 * @param body - ...
	 * @param params - ...
	 */
	<Params extends any[]>(
		name: string,
		body: TestBody<Params>,
		...params: Params
	): void

	/**
	 * A test you want to write.
	 * @param name - The name of the test, must be unique from all other tests in the same file.
	 * @param body - ...
	 * @param params - ...
	 */
	todo<Params extends any[]>(
		name: string,
		body?: TestBody<Params>,
		...params: Params
	): void

	/**
	 * A test that you want to skip... for now.
	 *
	 * This test will never run.
	 *
	 * ```ts
	 * test.skip("currently broken", t => {
	 *   t.is("hello world".toLowerCase(), "HELLO WORLD")
	 * })
	 * ```
	 *
	 * @param name - The name of the test, must be unique from all other tests in the same file.
	 * @param body - ...
	 * @param params - ...
	 */
	skip<Params extends any[]>(
		name: string,
		body: TestBody<Params>,
		...params: Params
	): void

	/**
	 * A test that you want to debug.
	 *
	 * If any tests are in debug mode, no other tests will run.
	 *
	 * ```ts
	 * test.debug("i want to focus on this while i'm working on it", t => {
	 *   t.is("hello world".toLowerCase(), "HELLO WORLD")
	 * })
	 * ```
	 *
	 * @param name - The name of the test, must be unique from all other tests in the same file.
	 * @param body - ...
	 * @param params - ...
	 */
	debug<Params extends any[]>(
		name: string,
		body: TestBody<Params>,
		...params: Params
	): void

	/**
	 * A test that you want to ignore if it fails.
	 *
	 * This test will still run and will report when it fails, but it won't cause
	 * your entire test suite to fail.
	 *
	 * ```ts
	 * test.ignore("this might fail sometimes, but i don't really care", t => {
	 *   t.assert(Math.random() > 0.5)
	 * })
	 * ```
	 *
	 * @param name - The name of the test, must be unique from all other tests in the same file.
	 * @param body - ...
	 * @param params - ...
	 */
	ignore<Params extends any[]>(
		name: string,
		body: TestBody<Params>,
		...params: Params
	): void

	/**
	 * A test that you expect to fail.
	 *
	 * ```ts
	 * test.failing("this is a known bug that i want to fix later", t => {
	 *   t.is("hello world".toLowerCase(), "HELLO WORLD")
	 * })
	 * ```
	 * @param name - The name of the test, must be unique from all other tests in the same file.
	 * @param body - ...
	 * @param params - ...
	 */
	failing<Params extends any[]>(
		name: string,
		body: TestBody<Params>,
		...params: Params
	): void

	/**
	 * A test that you want prioritized.
	 *
	 * This test will be run before others, and will fail your test suite even if
	 * you passed a `--ignore-failures`-type flag when running the suite. It also
	 * marks for other developers that the test is more important than others.
	 *
	 * @param name - The name of the test, must be unique from all other tests in the same file.
	 * @param body - ...
	 * @param params - ...
	 */
	required<Params extends any[]>(
		name: string,
		body: TestBody<Params>,
		...params: Params
	): void
}

/**
 * The definition of your test.
 */
export interface TestBody<Params extends any[]> {
	/**
	 * The function that will execute as your test.
	 *
	 * **Note:** This function can be async using promises.
	 *
	 * @param t - All the helpers you'll need to define your tests.
	 * @param params - Parameters passed to your test (see "macros").
	 */
	(t: TestContext, ...params: Params): any | Promise<any>
}

/**
 * The `t` parameter that gets created for each individual `test()` which
 * includes helpers for writing that test.
 */
export interface TestContext {
	/**
	 * Plan how many assertions should run during the test. If any other number of
	 * assertions run, then this will fail the test. Use only when needed.
	 *
	 * ```ts
	 * t.plan(3)
	 * ```
	 *
	 * @param count - The number of assertions that should run during the test.
	 */
	plan(count: number): void

	/**
	 * Assert that a value is `true` and nothing else.
	 *
	 * ```ts
	 * t.assert(a === b)
	 * ```
	 *
	 * @param value - ...
	 * @param message - An optional message describing the assertion (keep it short).
	 */
	assert(value: boolean, message?: string): void

	/**
	 * Assert that a value is equal to another value via `Object.is()`.
	 *
	 * ```ts
	 * t.is(a, b)
	 * ```
	 *
	 * @param value - The value you want to assert.
	 * @param expected -  The value it is expected to equal.
	 * @param message - An optional message describing the assertion (keep it short).
	 */
	is<T>(value: T, expected: T, message?: string): void

	/**
	 * Assert that a value is _not_ equal to another value via `!Object.is()`.
	 *
	 * ```ts
	 * t.not(a, b)
	 * ```
	 *
	 * @param value - The value you want to assert.
	 * @param expected - The value it is expected not to equal.
	 * @param message - An optional message describing the assertion (keep it short).
	 */
	not<T>(value: T, expected: any, message?: string): void

	/**
	 * Assert that a value is deeply equal to another value.
	 *
	 * ```ts
	 * t.deepEqual(a, b)
	 * ```
	 *
	 * @param value - The value you want to assert.
	 * @param expected - The value it is expected to deep equal.
	 * @param message - An optional message describing the assertion (keep it short).
	 */
	deepEqual<T, E extends T>(value: T, expected: E, message?: string): void

	/**
	 * Assert that a value is deeply not equal to another value.
	 *
	 * ```ts
	 * t.notDeepEqual(a, b)
	 * ```
	 *
	 * @param value - The value you want to assert.
	 * @param expected - The value it is expected not to deep equal.
	 * @param message - An optional message describing the assertion (keep it short).
	 */
	notDeepEqual<T>(value: T, expected: any, message?: string): void

	/**
	 * Assert that a function when called will throw an error.
	 *
	 * ```ts
	 * t.throws(() => {
	 *   throw new TypeError("Wrong!")
	 * }, "Wrong!")
	 *
	 * t.throws(() => {
	 *   throw new TypeError("Wrong!")
	 * }, TypeError)
	 *
	 * t.throws(() => {
	 *   throw new TypeError("Wrong!")
	 * }, /^Wrong/)
	 * ```
	 *
	 * If the function returns a promise, it will wait for the promise to
	 * fullfill/reject, and match against the rejected value. It will return a
	 * promise that will resolve when done.
	 *
	 * ```ts
	 * await t.throws(async () => {
	 *   await sleep(100)
	 *   throw new TypeError("Wrong!")
	 * }, "Wrong!")
	 * ```
	 *
	 * @param fn - The function that will be called.
	 * @param expected - The expected error to be thrown.
	 * @param message - An optional message describing the assertion (keep it short).
	 */
	throws<T>(fn: () => T, expected: string | RegExp | Error, message?: string): T

	/**
	 * Assert that a function when called will not throw an error.
	 *
	 * ```ts
	 * t.notThrows(() => {
	 *   runsWithoutAnyErrors()
	 * })
	 * ```
	 *
	 * If the function returns a promise, it will wait for the promise to
	 * fullfill/reject. It will return a promise that will resolve when done.
	 *
	 * ```ts
	 * await t.notThrows(async () => {
	 *   await runsWithoutAnyErrors()
	 * })
	 * ```
	 *
	 * @param fn - The function that will be called.
	 * @param message - An optional message describing the assertion (keep it short).
	 */
	notThrows<T>(fn: () => T, message?: string): T

	/**
	 * A passing assertion.
	 *
	 * ```ts
	 * t.pass()
	 * ```
	 *
	 * @param message - An optional message describing the assertion (keep it short).
	 */
	pass(message?: string): void

	/**
	 * A failing assertion.
	 *
	 * ```ts
	 * t.fail()
	 * ```
	 *
	 * @param message - An optional message describing the assertion (keep it short).
	 */
	fail(message?: string): void

	/**
	 * A value to snapshot and compare against a previous copy of the snapshot.
	 *
	 * ```ts
	 * t.snapshot(createsLargeValueThatShouldAlwaysBeTheSame())
	 * ```
	 *
	 * @param value - The value to snapshot.
	 * @param message - An optional message describing the assertion (keep it short).
	 */
	snapshot(value: any, message?: string): void

	/**
	 * Queue a function to be called after the test passes or fails to do some
	 * cleaning up work. Use this instead of `beforeEach/afterEach` inside
	 * "helpers". Can be async.
	 *
	 * ```ts
	 * async function createDb(t) {
	 *   let db = new DatabaseConnection()
	 *   await db.connect()
	 *   t.teardown(async () => {
	 *     await db.disconnect()
	 *   })
	 *   return db
	 * }
	 *
	 * test("it works", async t => {
	 *   let db = await createDb(t)
	 *   // ...
	 * })
	 * ```
	 *
	 * @param fn - The function to call after the test passes or fails.
	 */
	teardown(fn: () => any): void

	/**
	 * Create an abstract "lock" by calling `t.lock(name)`.
	 *
	 * `t.lock("name")` will return a promise that will resolve when it is the
	 * only test running that has locked `"name"`. This ensures that a test that
	 * has locked `"name"` does not run at the same time as any other test that
	 * has locked `"name"`. The lock will be released at the end of the test or
	 * when you call `lock.release()`.
	 *
	 * This is useful for scenarios where you can't have two tests performing
	 * side effects on a shared resource concurrently.
	 *
	 * **HOWEVER**, it does not provide you with any strict guarantees that tests
	 * which have _not_ called `t.lock("name")` aren't using the shared resource.
	 *
	 * This is a primitive for dealing with test concurrency. Use sparingly,
	 * use only in test helpers, and be strict about your usage.
	 *
	 * ```ts
	 * async function createDb(t) {
	 *   let lock = await t.lock("db")
	 *   let db = new DatabaseConnection()
	 *   await db.connect()
	 *   t.teardown(async () => {
	 *     await db.disconnect()
	 *     lock.release() // (not necessary)
	 *   })
	 *   return db
	 * }
	 *
	 * test("it works", async t => {
	 *   let db = await createDb(t)
	 *   // ...
	 * })
	 * ```
	 *
	 * Note: This lock applies across processes, this ensures that your test is
	 * the only one locked on a particular resource across all parallel processes.
	 *
	 * @param name - The global name that you want to lock.
	 */
	lock(name: string): Promise<TestLock>

	/**
	 * Create a stub "mock" function that records every time it gets called.
	 *
	 * The stub will be torn down after the test finishes. If it gets called
	 * after the test finishes, it will throw an error.
	 *
	 * ```ts
	 * let stub = t.stub()
	 * await Promise.resolve().then(stub)
	 * t.is(stub.calls.length, 1)
	 * ```
	 *
	 * ```ts
	 * let stub = t.stub((value) => value * 2)
	 * let res = await Promise.resolve(21).then(stub)
	 * t.is(res, 42)
	 * t.is(stub.calls.length, 1)
	 * t.is(stub.calls[0].arguments[0], 21)
	 * t.is(stub.calls[0].return, 42)
	 * ```
	 *
	 * @param fn - An optional inner function to call.
	 */
	stub<Fn extends AnyFunction = NoopFunction>(fn?: Fn): TestStub<Fn>

	/**
	 * Creates a spy "mock" function that replaces an object's method with its
	 * own function and records every time it gets called.
	 *
	 * After the test finishes, the spy will be torn down and the object's
	 * original method will be restored.
	 *
	 * ```ts
	 * let obj = {
	 *   method() {
	 *     throw new Error("replace me ")
	 *   }
	 * }
	 * let spy = t.spy(obj, "method", value => {
	 *   return value * 2
	 * })
	 *
	 * let res = obj.method(21)
	 *
	 * t.is(res, 42)
	 * t.is(spy.calls.length, 1)
	 * t.is(spy.calls.this, obj)
	 * t.is(spy.calls.arguments[0], 21)
	 * t.is(spy.calls.return, 43)
	 * ```
	 *
	 * @param source - The object.
	 * @param member - The name of the object's method to replace.
	 * @param fn - The replacement function.
	 */
	spy<
		Source extends object,
		Member extends KeysBy<Source, AnyFunction>,
		Fn extends CastType<Source[Member], AnyFunction>
	>(
		source: Source,
		member: Member,
		fn: Fn,
	): TestSpy<Fn>

	/**
	 * Take control of the progress of time within your tests.
	 *
	 * This uses a special lock that will wait until it is the only test
	 * controlling time.
	 *
	 * This can help make your test-dependent times more reliable, and also make
	 * them execute faster as you don't have to wait for the actual time to
	 * progress.
	 *
	 * ```ts
	 * test("t.clock()", async t => {
	 *   let clock = await t.clock() // take control over time
	 *   let stub = t.stub()
	 *   setTimeout(stub, 100)
	 *   await clock.time(100) // move time forward by 100ms
	 *   t.is(stub.calls.length, 1)
	 * })
	 * ```
	 *
	 * Note: The lock on time does not apply across processes, only to the
	 * current process. Tests in other processes may still execute in parallel.
	 */
	clock(): Promise<TestClock>

	/**
	 * Extend the timeout from the current point in time in the test.
	 *
	 * Tests have a very aggressive timeout by default (50ms). If you need more
	 * time while the test is running, you can keep requesting more by calling
	 * `t.extendTimeout()`.
	 *
	 * If you have multiple parts of your test that take up a lot of time, you
	 * should call `t.extendTimeout()` for each part. This will help you from
	 * adding arbitrarily long timeouts.
	 *
	 * You should also be careful about not just extending the timeout every time
	 * a test takes too long. Try to make your test run faster by mocking parts
	 * of your test or using `t.clock()` to control the flow of time in your test.
	 *
	 * ```ts
	 * test("test timeouts (bad)", async t => {
	 *   // Add time for the entire test to complete (bad)
	 *   await t.timeout(200, async () => {
	 *     await sleep(99)
	 *     await sleep(99)
	 *   })
	 *   t.pass()
	 * })
	 *
	 * test("test timeouts (good)", async t => {
	 *   // Add some time one part of the test (good)
	 *   await t.timeout(100, async () => {
	 *     await sleep(99)
	 *   })
	 *   // Add more time for other parts (good)
	 *   await t.timeout(100, async () => {
	 *     await sleep(99)
	 *   })
	 *   t.pass()
	 * })
	 * ```
	 *
	 * Note: `t.clock()` methods will not modify the timeout of the test.
	 *
	 * @param ms - The amount of milliseconds to extend the timeout from the current point in time by.
	 */
	timeout(ms: number, fn: () => any | Promise<any>): void
}

/**
 * Control the progress of time within your tests.
 *
 * ```ts
 * test("t.clock()", async t => {
 *   let clock = await t.clock()
 *   // ...Use `clock`...
 * })
 * ```
 */
export interface TestClock {
	/**
	 * Move timers ahead in milliseconds.
	 *
	 * @param ms - The number of milliseconds to move timers ahead by.
	 *
	 * ```ts
	 * test("clock.time()", async t => {
	 *   let clock = await t.clock()
	 *   let stub = t.stub()
	 *   setTimeout(stub, 100)
	 *   await clock.time(100)
	 *   t.is(stub.calls.length, 1)
	 * })x
	 * ```
	 */
	time(ms: number): Promise<void>

	/**
	 * Move micro-tasks ahead by "ticks".
	 *
	 * @param count - The number of ticks to move ahead by (Default: 1).
	 *
	 * ```ts
	 * test("clock.tick()", async t => {
	 *   let clock = await t.clock()
	 *   let stub = t.stub()
	 *   setImmediate(stub)
	 *   await clock.tick()
	 *   t.is(stub.calls.length, 1)
	 * })
	 * ```
	 */
	tick(count?: number): Promise<void>

	/**
	 * Move frames ahead.
	 *
	 * @param count - The number of frames to move ahead by (Default: 1).
	 *
	 * ```ts
	 * test("clock.frame()", async t => {
	 *   let clock = await t.clock()
	 *   let stub = t.stub()
	 *   requestAnimationFrame(stub)
	 *   await clock.tick()
	 *   t.is(stub.calls.length, 1)
	 * })
	 * ```
	 */
	frame(count?: number): Promise<void>

	/**
	 * Run through all queued timers/microtasks/frames until there is nothing
	 * left in the queue.
	 *
	 * ```ts
	 * test("clock.drain()", async t => {
	 *   let clock = await t.clock()
	 *   let stub = t.stub()
	 *   requestAnimationFrame(() => {
	 *     setTimeout(() => {
	 *       setImmediate(stub)
	 *     }, 100)
	 *   })
	 *   await clock.drain()
	 *   t.is(stub.calls.length, 1)
	 * })
	 * ```
	 */
	drain(): Promise<void>
}

/**
 * An object representing the locked value in the current test. Will
 * automatically release at the end of the test. Call `lock.release()` to
 * release manually.
 *
 * ```ts
 * test("t.lock()", async t => {
 *   let lock = await t.lock(value)
 *   // ...Use `value`...
 * })
 * ```
 *
 * @remarks
 * **Important!** Locks aren't meant to protect you from using a value when it
 * is not locked, merely to schedule test execution which would otherwise run
 * concurrently.
 *
 * Locks will serialize any JavaScript value to a string so that the value will
 * be locked across different threads without sharing memory.
 */
export interface TestLock {
	/**
	 * Release the locked object so other tests attempting to lock it can do so.
	 * This method is idempotent and if not called will automatically be released
	 * at the end of the test the lock was created in.
	 *
	 * ```ts
	 * test("t.lock()", async t => {
	 *   let lock = await t.lock(value)
	 *   // ...Use `value`...
	 *   lock.release()
	 *   // ...Dont use `value`...
	 * })
	 * ```
	 */
	release(): void
}

/**
 * A mock function that records how it was called.
 */
export interface TestStub<Fn extends AnyFunction> extends TestMockFn<Fn> {}

/**
 * A mock function that replaces a method on an object and records how it was
 * called.
 */
export interface TestSpy<Fn extends AnyFunction> extends TestMockFn<Fn> {
	/**
	 * The original object method function which was replaced by the spy.
	 */
	original: Fn
}

/**
 *
 */
export interface TestMockFn<Fn extends AnyFunction> {
	/**
	 * @param params - Parameters that will be passed into the mock function.
	 */
	(this: FunctionThisType<Fn>, ...params: Parameters<Fn>): ReturnType<Fn>

	/**
	 * A record of all the times that the mock function was called.
	 */
	calls: TestMockCall<Fn>[]
}

/**
 * A record of a single call to a mock function.
 */
export interface TestMockCall<Fn extends AnyFunction> {
	/**
	 * The `this` that the mock function was called with.
	 */
	this: FunctionThisType<Fn>

	/**
	 * The `arguments` that the mock function was called with.
	 */
	arguments: Parameters<Fn>

	/**
	 * The value that was returned by the mock function.
	 */
	return: ReturnType<Fn>
}

/**
 * Utility types
 */

// prettier-ignore
/** @private */
type StrictFunction<This, Params extends any[], Return> = (this: This, ...params: Params) => Return
/** @private */
type AnyFunction = StrictFunction<any, any[], any>
/** @private */
type NoopFunction = StrictFunction<any, any[], void>
// prettier-ignore
/** @private */
type FunctionThisType<T extends AnyFunction> = T extends StrictFunction<infer R, any[], any> ? R : never
// prettier-ignore
/** @private */
type PickBy<Source, Type> = { [Key in keyof Source]: Source[Key] extends Type ? Key : never }
/** @private */
type KeysBy<Source, Type> = PickBy<Source, Type>[keyof Source]
/** @private */
type CastType<U, T> = U extends T ? U : never
