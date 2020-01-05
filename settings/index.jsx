function colorSelect(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Color Settings</Text>}>
        <ColorSelect
          settingsKey="color"
          colors={[
            {color: '#B8FC68', value: 'fb-lime'},
            {color: '#3182DE', value: 'fb-blue'},
            {color: '#7090B5', value: 'fb-slate'},
            {color: '#5B4CFF', value: 'fb-indigo'},
            {color: '#F83C40', value: 'fb-red'},
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(colorSelect);