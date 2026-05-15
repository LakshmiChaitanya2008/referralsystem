import { USER_ID_PREFIX } from "../lib/userIdAuth";

export default function UserIdField({ digits, onDigitsChange, id = "user-id-digits" }) {
  return (
    <div className="w-full space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700 dark:text-neutral-300"
      >
        User ID
      </label>
      <div className="flex overflow-hidden rounded-xl border border-slate-200 dark:border-neutral-800 focus-within:border-blue-500 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.2)] dark:focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.3)]">
        <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
          {USER_ID_PREFIX}
        </span>
        <input
          id={id}
          name="userIdDigits"
          value={digits}
          onChange={onDigitsChange}
          inputMode="numeric"
          autoComplete="username"
          placeholder="123456789"
          maxLength={9}
          minLength={9}
          pattern="[0-9]{9}"
          required
          className="w-full bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500"
        />
      </div>
      <p className="text-xs text-slate-500 dark:text-neutral-400">
        Your ID is {USER_ID_PREFIX} plus 9 digits (e.g. {USER_ID_PREFIX}123456789).
      </p>
    </div>
  );
}
