"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Logout = () => {
  return (
    <>
      <div>
        <button className="bg-orange-300 rounded-md p-2 mt-4" onClick={() =>
            signOut({ callbackUrl: "/auth/login", redirect: true, })}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
