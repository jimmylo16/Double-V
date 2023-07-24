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
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type TFollowersBarChart = {
  followersData: InfiniteData<GithubUsers>;
};
const FollowersBarChart: FC<TFollowersBarChart> = ({ followersData }) => {
  const data = followersData.pages[0].items.map(({ login }) => login);

  const userFollowersQuery = useGetFollowers(data);

  console.log({ userFollowersQuery, data });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="followers" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FollowersBarChart;
