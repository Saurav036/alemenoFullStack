import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Progress } from "flowbite-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import list from "./list.json";
import CustomCard from "../components/Card";
import { useDispatch } from "react-redux";
import { privateApi } from "../api/axios";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  const [data, setData] = useState(null);

  const getData = async () => {
    const res = await privateApi.get("/dashboard/110");
    console.log("dashboard data", res);
    if (res?.data) setData(res?.data?.data);
  };
  // const getRefreshToken =async( )=>{
  //   // const res = await privateReq.get('refresh')
  //   const res = await axios.get("http://localhost:3000/refresh",{withCredentials:true}).then(res=>res.json()).then(res=>res).catch(err=>console.log('.then > err', err));
  //   console.log('refresh token', res)

  // }

  useEffect(() => {
    getData();
  }, []);

  // const dummyData = {
  //   rollNumber: 110,
  //   username: "bhupendra jogi",
  //   password: "$2b$10$XHTqOiDqQKzlae2xOXErde.AsTlYiJ.2VgDlWGvoIAwkRz4FtROtS",
  //   refreshToken:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJodXBlbmRyYSBqb2dpIiwiaWF0IjoxNjk4OTY5NTExLCJleHAiOjE2OTg5Njk1NTF9.jMMl6xYvcGneMiDSiTBWqnuG4rVNDdkuTkB0qqgMnA4",
  //   enrolledIn: [
  //     {
  //       id: "c1",
  //       name: "Learn Python in 4 weeks",
  //       completed: [
  //         {
  //           sid: 101,
  //           week: 1,
  //           progress: 100,
  //           topic: "Introduction to React Native",
  //           content:
  //             "Overview of React Native, setting up your development environment.",
  //         },
  //         {
  //           sid: 102,
  //           week: 2,
  //           progress: 70,
  //           topic: "Building Your First App",
  //           content:
  //             "Creating a simple mobile app using React Native components.",
  //         },
  //       ],
  //       startDate: "1 october 2023",
  //     },
  //     {
  //       id: "c2",
  //       name: "Introduction to React Native",
  //       completed: [
  //         {
  //           sid: 101,
  //           week: 1,
  //           progress: 37,
  //           topic: "Introduction to React Native",
  //           content:
  //             "Overview of React Native, setting up your development environment.",
  //         },
  //         {
  //           sid: 102,
  //           week: 2,
  //           progress: 47,
  //           topic: "Building Your First App",
  //           content:
  //             "Creating a simple mobile app using React Native components.",
  //         },
  //       ],
  //       startDate: "1 october 2023",
  //     },
  //   ],
  //   email: "bhupendra_jogi@usa.com",
  // };
  const value = 0.66;
  const percentage = 66;

  return (
    <div className="flex flex-col px-10 py-14 w-4/6 bg-slate-100">
      <div className="flex justify-between mb-6 ml-2">
        <div className="text-2xl font-bold">Dashboard</div>
        {/* <button className='bg-blue-500 rounded-lg p-4'onClick={()=>getData()}>get data </button> */}
        {/* <button className='bg-blue-500 rounded-lg p-4'onClick={()=>getRefreshToken()}>refresh token </button> */}
        <div className="font-medium text-slate-700">{formattedDate}</div>
      </div>
      <div className="rounded-2xl bg-purple-200 p-5 ">
        <h1 className="text-violet-500 font-bold text-2xl mb-4">
          Welcome back {data?.username}
        </h1>
        <p className="text-slate-500 font-semibold text-lg">
          You have completed 75% of your this week. stay motivated and keep
          moving forward to achieve your goals.
        </p>
      </div>

      <div className="flex flex-row justify-center items-start w-full gap-6 ">
        <div className="flex flex-col  font-sans  mt-10 w-full ">
          {data &&
            data?.enrolledIn?.map((c) => {
              return (
                <div className="shadow-md  mb-6 w-full p-5 rounded-2xl bg-white">
                  <div className="text-violet-600 font-semibold text-2xl mb-3">
                    Progress
                  </div>
                  <div>
                    <div className="flex flex-col gap-2">
                      <div className="text-md font-medium text-slate-600">
                        {c.name}
                      </div>
                      {c.completed.map((l, idx) => {
                        return (
                          <>
                            <div className="text-sm text-slate-600">
                              {`${idx + 1} ${l.topic}`}
                            </div>
                            <Progress progress={l.progress} color="purple" />
                          </>
                        );
                      })}
                      {/* <Progress progress={45} color="purple" /> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className=" text-violet-600 rounded-2xl p-5 my-10  shadow-md w-full bg-white">
          <div className="text-2xl font-semibold">Score</div>
          <div className="items-center w-4/6 p-4">
            <div>
              <CircularProgressbar
                value={percentage}
                text={`75%`}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  rotation: 0,
                  display: "flex",
                  justifyContent: "center",

                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "round",

                  // Text size
                  textSize: "14px",

                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 1,

                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',

                  // Colors
                  pathColor: `#c7cbf0`,
                  textColor: "#f88",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
              />
            </div>
          </div>
          <div className="text-sm text-slate-500">
            Progress represents forward movement and improvement, encompassing
            technological, social, and environmental advancements that shape our
            future.
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-6 ml-2">
        <div className="text-2xl font-bold">Available Courses</div>
        <div
          className="font-medium text-slate-700 cursor-wait"
          onClick={() => {
            navigate("/courses");
          }}
        >
          More
        </div>
      </div>
      <div className="flex flex-row">
        {list?.slice(0, 3)?.map((l) => (
          <div className="mr-6">
            <CustomCard {...l} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
