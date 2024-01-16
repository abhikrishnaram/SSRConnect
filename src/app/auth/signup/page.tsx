

const RegisterPage = () => {
  return (
      <div className="flex items-center justify-center flex-col">
          {/*<RegisterForm />*/}
          <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md min-w-[330px] md:min-w-[400px] xl:p-0 shadow-lg border">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight text-left tracking-tight text-primary md:text-2xl">
                      Create new account
                  </h1>
                  <div className="text-left opacity-75">
                      Registering to the platform is currently disabled. Please contact the admin to create an account.
                  </div>
              </div>
          </div>
      </div>
  );
};

export default RegisterPage;
