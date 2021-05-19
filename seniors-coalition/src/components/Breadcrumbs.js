import React from 'react';
import { 
    Breadcrumbs as MUIBreadcrumbs,
    Link,
    Typography
} from '@material-ui/core';
import { withRouter } from "react-router-dom";

const Breadcrumbs = props => {

  const { 
      history,
      location : { pathname } 
    } = props;

  const pathnames = pathname.split('/').filter(x => x)
  if (pathnames.length > 3) pathnames.length = 3;

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
        {pathnames.length > 0 ? 
        <Link onClick={() => history.push("/")}>Home</Link>
        : <Typography>Home</Typography>

        }
      {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
          <Typography> {name.replace(/-/g, " ")} </Typography>
          ) : (
          <Link onClick={() => history.push(routeTo)}>{name.replace(/-/g, " ")}</Link>)
          
      })}
    </MUIBreadcrumbs>
  );
};

export default withRouter(Breadcrumbs);