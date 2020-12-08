import React from 'react';
import {View, Text} from 'react-native';
import {getUserRole} from '@constants/roles';
import Touchable from '@common-components/touchable';
import {useUser} from '@stores/user';
import {useAuth} from '@stores/auth';
import UserItem from '@components/user-item';
import {observer} from 'mobx-react-lite';
import {getMenuLinks} from '@config/menu-links';
import {randomID} from '@utils/random-id';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {styles} from './styles';

declare interface IMenuContentProps {
  navigator: EasyRouterNavigator;
}

const MenuContent = ({navigator}: IMenuContentProps) => {
  const {setAuth} = useAuth();
  const {user} = useUser();
  const userRole = getUserRole(user?.role);
  const links = getMenuLinks(user?.role);

  const onLogout = (): void => {
    setAuth(false);
  };

  const toScreen = (screenId: string): void => {
    const screenProps = screenId === 'Teacher' ? {teacher: user} : {};
    navigator.push(screenId, screenProps, {animation: 'fade'});
  };

  const User = (
    <View style={styles.user}>
      <UserItem
        mode="partial"
        avatar={user.avatar}
        userRole={userRole}
        textColor="white"
        rating={user.rating}
        username={user.username || ''}
      />
    </View>
  );

  const Links = (
    <View style={styles.links}>
      <View style={styles.linksWrap}>
        {links.map(({link, screen}) => (
          <View style={styles.link} key={randomID()}>
            <Touchable
              Child={<Text style={styles.logout}>{link}</Text>}
              onPress={() => {
                toScreen(screen);
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );

  const Separator = <View style={styles.separator} />;
  const Footer = (
    <View style={styles.bottom}>
      <View style={styles.footer}>
        <Touchable Child={<Text style={styles.logout}>Вийти</Text>} onPress={onLogout} />
      </View>
    </View>
  );
  return (
    <>
      <View style={styles.drawer}>
        {User}
        {Separator}
        {Links}
        {Footer}
      </View>
    </>
  );
};

export default observer(MenuContent);
