
export default function signUp({ open, setOpen }) {
    const [password, setPassword] = useState({ password: "", repeat: "" });
    const [email, setEmail] = useState("");

    const onEmailChange = (e) => {
        setEmail(e.target.value);
      };
      const onPasswordChange = (e) => {
        setPassword({ password: e.target.value, repeat: password.repeat });
      };
}