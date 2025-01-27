import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "styled-components";

import { Index } from "client/Routes";
import routes from "client/consts/routes";
import { Theme } from "client/styles/theme";
import { IntlRaw } from "client/records/Intl";
import InitIntl from "client/components/InitIntl";
import { Provider as IntlProvider } from "client/services/intl/context";

type Props = {
  theme: Theme;
  intlRaw: IntlRaw;
};

const Root = ({ theme, intlRaw }: Props) => (
  <ThemeProvider theme={theme}>
    <InitIntl intl={intlRaw}>
      {intl => (
        <IntlProvider value={intl}>
          <Helmet titleTemplate="%s | Reactizer" defaultTitle={`${intl.t(__("Home"))} | Reactizer`}>
            <html lang={intl.id} />
          </Helmet>

          <Switch>
            <Route path={routes.INDEX} exact render={() => <Index />} />

            <Redirect to={routes.INDEX} />
          </Switch>
        </IntlProvider>
      )}
    </InitIntl>
  </ThemeProvider>
);

export default Root;
