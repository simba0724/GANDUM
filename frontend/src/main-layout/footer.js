import React, { Fragment } from "react";
import {
  Typography,
  Box,
  Grid,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Fragment>
      <footer>
        <Box component="div" className="footer-upper">
          <Container>
            <Grid container spacing={5}>
              <Grid item md={4} sm={12} xs={12}>
                <Box textAlign="left">
                  <Typography variant="h4" className="color-footer">
                    Gandom Mart
                  </Typography>
                  {/* <Typography variant="subtitle1" className="footer-subtitle">
                    To sell online what you need is a lightning-fast platform
                    with easy to use user interface. With Ravendel deliver
                    exceptional digital experiences to your customers.
                  </Typography> */}
                </Box>
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <Typography
                  variant="h5"
                  className="footer-widget-header"
                  className="color-footer"
                >
                  Information
                  <hr />
                </Typography>
                <List dense>
                  <ListItem>
                    <Link to="/about">
                      <ListItemText
                        primary="About Us"
                        className="footer-menulink"
                      />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/terms">
                      <ListItemText
                        primary="Terms and Condition"
                        className="footer-menulink"
                      />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/refund">
                      <ListItemText
                        primary="Returns and Refunds"
                        className="footer-menulink"
                      />
                    </Link>
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <Typography
                  variant="h5"
                  className="footer-widget-header"
                  className="color-footer"
                >
                  Extra
                </Typography>
                <hr />

                <List dense>
                  <ListItem>
                    <Link to="/contact">
                      <ListItemText
                        primary="Contact Us"
                        className="footer-menulink"
                      />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/faq">
                      <ListItemText
                        primary="FAQ"
                        className="footer-menulink"
                        // style={{ color: "#000" }}
                      />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/blogs">
                      <ListItemText
                        primary="Blogs"
                        className="footer-menulink"
                      />
                    </Link>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          component="div"
          className="footer-down"
          flexDirection="column"
        >
          <Typography variant="body1" className="copyright-text">
            Copyright © 2021
            <a href="" target="_blank" rel="noopener noreferrer">
              Gandom Mart
            </a>
          </Typography>
          <Typography variant="body1" className="copyright-text">
            Developed by
            <a
              href="http://codevely.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Codevely Studio
            </a>
          </Typography>
        </Box>
      </footer>
    </Fragment>
  );
};

export default Footer;
