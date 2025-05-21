import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

const PasswordChecklist = ({ password }: { password: string }) => {
  const checks = {
    length: password.length >= 6,
    upperCase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password), // replace this with real checks
    specialCharacter: /[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]/.test(password), // replace this with real checks
  };

  const strength = Object.values(checks).filter(Boolean).length;

  const XComponent = () => <XCircleIcon className="w-5" />;
  const CheckCircleIconComponent = () => <CheckCircleIcon className="w-5" />;
  return (
    <div className="p-4 border bg-white shadow-lg border-gray-300 mt-2 rounded-2xl">
      <div className="w-full h-2 mb-3 bg-gray-50 rounded-full">
        <div className="flex gap-1 mb-3">
          {" "}
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-2 flex-1 rounded-full ${
                strength >= level
                  ? strength === 4
                    ? "bg-green-500"
                    : strength === 3
                    ? "bg-yellow-500"
                    : strength === 2 ? "bg-yellow-500" :"bg-red-600"
                  : "bg-gray-200"
              }`}
            />
          ))}{" "}
        </div>
      </div>
      {/* <p className="font-semibold text-gray-800 mb-2">Weak Password</p> */}
      <ul className="text-sm text-gray-700 text-left">
        <li
          className={`flex gap-2 ${
            checks.length ? "text-green-600" : "text-red-600"
          }`}
        >
          {checks.length ? <CheckCircleIconComponent /> : <XComponent />} At
          least six characters
        </li>
        <li
          className={`flex gap-2 ${
            checks.number ? "text-green-600" : "text-red-600"
          }`}
        >
          {checks.number ? <CheckCircleIconComponent /> : <XComponent />} At
          least one number address
        </li>
        <li
          className={`flex gap-2 ${
            checks.specialCharacter ? "text-green-600" : "text-red-600"
          }`}
        >
          {checks.specialCharacter ? (
            <CheckCircleIconComponent />
          ) : (
            <XComponent />
          )}{" "}
          At least one special character
        </li>
        <li
          className={`flex gap-2 ${
            checks.upperCase ? "text-green-600" : "text-red-600"
          }`}
        >
          {checks.upperCase ? <CheckCircleIconComponent /> : <XComponent />} At
          least one upper case character
        </li>
      </ul>
    </div>
  );
};

export default PasswordChecklist;
