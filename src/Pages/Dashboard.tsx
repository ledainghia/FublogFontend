import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { countBlogByAllCategory } from "../APICall/apiConfig";
import TableUser from "../components/TableUser";
import { blogCategoriesType } from "../config/TypeDefine";
export default function Dashboard() {
  const [seriesBlogCategories, setSeriesBlogCategories] = useState<number[]>(
    []
  );
  const [labelsBlogCategories, setLabelsBlogCategories] = useState<string[]>(
    []
  );
  const [update] = useState(false);
  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await countBlogByAllCategory();
        console.log(res);
        const allBlogCategories: blogCategoriesType[] = res.data.data;

        if (allBlogCategories.length > 0 && res.status === 200) {
          allBlogCategories.map((allBlogCategories: blogCategoriesType) => {
            setSeriesBlogCategories((series) => [
              ...series,
              allBlogCategories.numBlog,
            ]);
            setLabelsBlogCategories((labels) => [
              ...labels,
              allBlogCategories.categoryName,
            ]);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, [update]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Card>
            <CardHeader title="Blog posts per Categories"></CardHeader>
            <CardContent>
              {" "}
              <ReactApexChart
                type="donut"
                series={seriesBlogCategories.slice(0, 5)}
                options={{
                  labels: labelsBlogCategories.slice(0, 5),
                }}
              ></ReactApexChart>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item md={4}>
          <Card>
            <CardHeader title="Blog posts per Categories"></CardHeader>
            <CardContent>
              {" "}
              <ReactApexChart
                type="pie"
                series={seriesBlogCategories.slice(0, 5)}
                options={{
                  labels: labelsBlogCategories.slice(0, 5),
                }}
              ></ReactApexChart>
            </CardContent>
          </Card>
        </Grid> */}
        <Grid item md={12}>
          <Card>
            <CardHeader title="Manager user"></CardHeader>
            <CardContent>
              <TableUser></TableUser>
            </CardContent>
          </Card>
        </Grid>
      </Grid>{" "}
    </>
  );
}
