void setup()
{
  Serial.begin(9600);
  pinMode(A0, INPUT);
  pinMode(A1, INPUT);
  pinMode(7, INPUT);
  
}

void loop()
{
  int valueX = analogRead(A1);
  Serial.print("X:");
  Serial.println(valueX);
  
  int valueY = analogRead(A0);
  Serial.print("Y:");
  Serial.println(valueY);

  bool fire = digitalRead(7);
  Serial.print("F:");
  Serial.println(fire);

  delay(100);
}