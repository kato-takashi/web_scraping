importClass(java.io.File);
importClass(javax.imageio.ImageIO);
importClass(java.awt.Rectangle);
importClass(java.awt.Robot);


var robot = new Robot();
var img = robot.createScreenCapture(new Rectangle(java.awt.Toolkit.getDefaultToolkit().getScreenSize()));
ImageIO.write(img, "jpg", (new File("test.jpg")));
