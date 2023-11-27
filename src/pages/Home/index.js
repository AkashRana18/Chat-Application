import { Col, Grid, Row } from 'rsuite';
import { Route, Switch } from 'react-router';
import Sidebar from '../../components/Sidebar';
import { RoomsProvider } from '../../context/room.context';
import Chat from './Chat';
import { useMediaQuery } from '../../misc/custom-hooks';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Home = () => {
  const isDeskTop = useMediaQuery('(min-width: 992px)');

  const { isExact } = useRouteMatch();

  const canRenderSidebar = isDeskTop || isExact;

  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {canRenderSidebar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          )}
          <Switch>
            <Route exact path="/chat/:chatId">
              <Col Col xs={24} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>
            <Route>
              {isDeskTop && (
                <Col xs={24} md={16} className="h-100">
                  <h6 className="text-center mt-page">Please select chat</h6>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
