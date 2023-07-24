import { useGetFollowers } from "@/hooks/useGetFollowers";
import { GithubUsers } from "@/interfaces/githubUsers";
import { InfiniteData } from "@tanstack/react-query";
import React, { FC, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Text,
} from "recharts";

type TFollowersBarChart = {
  followersData: InfiniteData<GithubUsers>;
};
const FollowersBarChart: FC<TFollowersBarChart> = ({ followersData }) => {
  const data = followersData.pages[0].items.map(({ login }) => login);

  const userFollowersQuery = useGetFollowers(data);

  console.log({ userFollowersQuery, followersData });

  return userFollowersQuery.isSuccess ? (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={userFollowersQuery.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="user"
            axisLine={{ stroke: "#ffffff " }}
            tick={{ fill: "#ffffff " }}
          />
          <YAxis
            axisLine={{ stroke: "#ffffff " }}
            tick={{ fill: "#ffffff " }}
          />
          <Bar dataKey="numberOfFollowers" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  ) : (
    <>Loading Followers Chart</>
  );
};

export default FollowersBarChart;
