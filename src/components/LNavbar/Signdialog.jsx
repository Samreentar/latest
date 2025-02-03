"use client";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import axios from "axios";
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

const Signin = () => {
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setError(""); // Clear errors when closing the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate role selection
    if (!role) {
      setError("Please select a role (Student, Teacher, Admin).");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email: formData.email,
        password: formData.password,
        role: role,
      });

      const { token, userType } = response.data;

      // Save token and user details in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", userType);

      // Redirect user based on role
      if (userType === "student") router.push("/Dashboard/student");
      else if (userType === "teacher") router.push("/Dashboard/teacher");
      else if (userType === "admin") router.push("/Dashboard/admin");

      alert("Login successful!");

      closeModal();

    } catch (error) {
      setError(error.response.data.message || "An error occurred");
      alert(error.response.data.message || "An error occurred");
    }
  };

  return (
    <>
      <button
        type="button"
        className="bg-purple w-full hover:bg-purple hover:text-white text-white font-medium my-2 py-2 px-4 rounded"
        onClick={openModal}
      >
        Sign In
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="w-full max-w-md space-y-8">
                    <div>
                      <img
                        className="mx-auto h-12 w-35"
                        src="/assets/logo/exam1.png"
                        alt="Your Company"
                      />
                      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Welcome back! Access your account now
                      </h2>
                    </div>
                    {error && (
                      <p className="text-red-600 text-center">{error}</p>
                    )}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <input
                          id="email-address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="relative block w-full rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Email address"
                        />
                      </div>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={passwordVisible ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="relative block w-full rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          {passwordVisible ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <div className="flex space-x-10 mt-4">
                        {["student", "teacher", "admin"].map((r) => (
                          <label key={r} className="space-x-2">
                            <input
                              type="radio"
                              value={r}
                              checked={role === r}
                              onChange={(e) => setRole(e.target.value)}
                            />
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                          </label>
                        ))}
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="w-full rounded-md bg-purple py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                          <LockClosedIcon className="h-5 w-5 inline mr-2" />
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Signin;
