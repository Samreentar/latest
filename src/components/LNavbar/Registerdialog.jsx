"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import the router
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    role: "student", // Default role
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
    schoolName: "",
    schoolAddress: "",
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      role: value,
      address: value === "student" ? prevUser.address : "", // Clear address if not student
      schoolName: value === "student" ? "" : prevUser.schoolName,
      schoolAddress: value === "student" ? "" : prevUser.schoolAddress,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        console.log("user", user.email);
        alert("Registration successful! An OTP has been sent to your email.");
        closeModal(); // Close the modal
        router.push(`/email-verification?email=${user.email}`);

        // Redirect to OTP verification page
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      {/* Sign In Button - Visible on All Screens */}
      <button
        type="button"
        className="text-20px font-medium space-links"
        onClick={openModal}
      >
        Register
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
                  <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                      <div>
                        <img
                          className="mx-auto h-12 w-35"
                          src="/assets/logo/exam1.png"
                          alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                          Register Your Account
                        </h2>
                      </div>
                      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input
                          type="hidden"
                          name="remember"
                          defaultValue="true"
                        />
                        <div className="space-y-4">
                          {/* <div>
                            <label
                              htmlFor="role"
                              className="block text-sm font-medium text-gray-700"
                            >
                              I am a
                            </label>
                            <select
                              id="role"
                              name="role"
                              value={user.role}
                              onChange={handleRoleChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              <option value="teacher">Teacher</option>
                              <option value="admin">School Admin</option>
                              <option value="student">Student</option>
                            </select>
                          </div> */}

                          <div>
                            <label htmlFor="username" className="sr-only">
                              Full Name
                            </label>
                            <input
                              id="fullName"
                              name="fullName"
                              type="text"
                              value={user.fullName}
                              onChange={handleInput}
                              required
                              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Full Name"
                            />
                          </div>

                          <div>
                            <label htmlFor="phone" className="sr-only">
                              Phone Number
                            </label>
                            <input
                              id="phoneNumber"
                              name="phoneNumber"
                              type="number"
                              value={user.phoneNumber}
                              onChange={handleInput}
                              required
                              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Phone Number"
                            />
                          </div>

                          <div>
                            <label htmlFor="address" className="sr-only">
                              Address
                            </label>
                            <input
                              id="address"
                              name="address"
                              type="text"
                              value={user.address}
                              onChange={handleInput}
                              required
                              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Address"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="sr-only">
                              Email
                            </label>
                            <input
                              id="email-address"
                              name="email"
                              type="email"
                              value={user.email}
                              onChange={handleInput}
                              autoComplete="email"
                              required
                              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Email address"
                            />
                          </div>

                          <div>
                            <label htmlFor="password" className="sr-only">
                              Password
                            </label>
                            <input
                              id="password"
                              name="password"
                              type="password"
                              value={user.password}
                              onChange={handleInput}
                              autoComplete="current-password"
                              required
                              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Password"
                            />
                          </div>

                          {(user.role === "teacher" ||
                            user.role === "admin") && (
                            <>
                              <div>
                                <label
                                  htmlFor="school_name"
                                  className="sr-only"
                                >
                                  School Name
                                </label>
                                <input
                                  id={`schoolName-${user.role}`}
                                  name="schoolName"
                                  type="text"
                                  value={user.schoolName}
                                  onChange={handleInput}
                                  required
                                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                  placeholder="School name"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="schoolAddress"
                                  className="sr-only"
                                >
                                  School Address
                                </label>
                                <input
                                  id={`schoolAddress-${user.role}`}
                                  name="schoolAddress"
                                  type="text"
                                  value={user.schoolAddress}
                                  onChange={handleInput}
                                  required
                                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                  placeholder="School address"
                                />
                              </div>
                            </>
                          )}
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <LockClosedIcon
                                className="h-5 w-5 text-indigo-300 group-hover:text-indigo-400"
                                aria-hidden="true"
                              />
                            </span>
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
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

export default Register;
