import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import SwitchSelector from 'react-native-switch-selector';
import {ILLogo} from '../../assets';
import {ButtonCustom, Gap, Header} from '../../components';
import {colors, fonts} from '../../utils';

const Register = ({navigation}) => {
  const [gender, setGender] = useState();

  return (
    <View style={styles.container}>
      <Header onPress={() => navigation.goBack()} title="Registration" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <ILLogo width={'70%'} alignSelf={'center'} />
        </View>
        <View style={styles.formInput}>
          <Text style={styles.title}>Register</Text>
          <Gap height={15} />
          <TextInput placeholder="Email" mode="outlined" />
          <Gap height={15} />
          <TextInput placeholder="Password" secureTextEntry mode="outlined" />
          <Gap height={15} />
          <TextInput placeholder="Full name" mode="outlined" />
          <Gap height={15} />
          <SwitchSelector
            initial={0}
            onPress={(value) => setGender({gender: value})}
            textColor={colors.text.purple}
            selectedColor={colors.text.secondary}
            buttonColor={colors.text.purple}
            borderColor={colors.text.purple}
            borderRadius={5}
            hasPadding
            options={[
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
            ]}
            height={50}
            style={{marginTop: 7, marginBottom: 15}}
          />
          <TextInput placeholder="Phone number" mode="outlined" />
          <Gap height={15} />
          <TextInput placeholder="Address" mode="outlined" />
          <Gap height={15} />
          <TouchableOpacity style={styles.btnUpload}>
            <Text style={styles.txtButton}>Upload photo profile</Text>
          </TouchableOpacity>
          <Gap height={15} />
          <ButtonCustom title="Register" type="primary" />
          <Gap height={15} />
        </View>

        <View style={styles.noAccount}>
          <Text style={styles.txtNotAccount}>Have an account? click</Text>
          <Text
            style={styles.linkNotAccount}
            onPress={() => navigation.navigate('Login')}>
            {' '}
            here
          </Text>
        </View>
        <Gap height={20} />
      </ScrollView>
    </View>
  );
};

export default Register;

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
  btnUpload: {
    backgroundColor: colors.button.tersier,
    paddingVertical: 13,
    borderRadius: 5,
  },
  txtButton: {
    color: colors.text.secondary,
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 5,
  },
});
