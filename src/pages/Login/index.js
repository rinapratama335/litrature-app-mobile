import React, {Fragment, useContext, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {ILLogo} from '../../assets';
import {ButtonCustom, Gap, Loading} from '../../components';
import {colors, fonts, getData, storeData, useForm} from '../../utils';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {API, setAuthToken} from '../../apiConfig';
import {UserContext} from '../../context/UserContext';

const Login = ({navigation}) => {
  const [state, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const {email, password} = form;

  const handleSubmit = async (e) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({email, password});

    console.log('Jangkrikkkk : ', body);

    setLoading(true);

    try {
      const res = await API.post('/login', body, config);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data.data.user,
      });

      console.log('Data response user : ', res.data.data.user.token);
      storeData('token', res.data.data.user.token);

      setAuthToken(res.data.data.user.token);

      try {
        const res = await API.get('/auth');

        dispatch({
          type: 'USER_LOADED',
          payload: res.data.data.user,
        });

        // console.log('Role user: ', res.data.data.user.role);
        setLoading(false);
        navigation.replace('MainApp');
      } catch (err) {
        console.log(err);

        dispatch({
          type: 'AUTH_ERROR',
        });
      }
    } catch (err) {
      console.log(err);

      dispatch({
        type: 'LOGIN_FAIL',
      });
    }
  };

  // showMessage({
  //   message: 'Hello world',
  //   backgroundColor: colors.redDanger,
  //   color: colors.text.secondary,
  // });

  // console.log(state.user.fullName);

  return (
    <Fragment>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <ILLogo width={'70%'} alignSelf={'center'} />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.title}>Signin</Text>
            <Gap height={15} />
            <TextInput
              placeholder="Email"
              mode="outlined"
              name="email"
              value={email}
              onChangeText={(value) => setForm('email', value)}
            />
            <Gap height={15} />
            <TextInput
              placeholder="Password"
              secureTextEntry
              mode="outlined"
              name="password"
              value={password}
              onChangeText={(value) => setForm('password', value)}
            />
            <Gap height={15} />
            <ButtonCustom title="Login" type="primary" onPress={handleSubmit} />
            <Gap height={15} />
          </View>
          <View style={styles.noAccount}>
            <Text style={styles.txtNotAccount}>
              Don't have an account? click
            </Text>
            <Text
              style={styles.linkNotAccount}
              onPress={() => navigation.navigate('Register')}>
              {' '}
              here
            </Text>
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </Fragment>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  title: {
    fontSize: 30,
    color: colors.text.secondary,
    textAlign: 'center',
    fontFamily: fonts.primary[700],
    marginTop: 20,
  },
  formInput: {
    marginHorizontal: 15,
  },
  noAccount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 15,
  },
  txtNotAccount: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  linkNotAccount: {
    fontSize: 16,
    color: colors.text.orange,
  },
});
